from transformers import TrainingArguments, Trainer, PreTrainedTokenizerBase, PreTrainedModel
from peft import LoraConfig
from trl import SFTTrainer
from datasets import DatasetDict


class CustomTrainer:
    _EFLINT_CONTEXT: str
    _DPCL_CONTEXT: str
    _tpe: str

    trainer: Trainer
    tokenizer: PreTrainedTokenizerBase
    model: PreTrainedModel
    dataset: DatasetDict

    def __init__(self, tpe: str, model: PreTrainedModel, dataset: DatasetDict,
                 tokenizer: PreTrainedTokenizerBase) -> None:
        """
        Initialize this class.

        :param tpe: The type of norm language. (flint, dcpl)
        :param model: The model used.
        :param dataset: The dataset.
        :param tokenizer: The tokenizer.
        """
        with open("tmp/eflint.txt", "r") as f:
            self._EFLINT_CONTEXT = f.read()  #
        with open("tmp/dpcl.txt", "r") as f:
            self._DPCL_CONTEXT = f.read()

        self._tpe = tpe

        self.tokenizer = tokenizer
        # setting padding instructions for tokenizer
        self.tokenizer.pad_token = self.tokenizer.eos_token
        self.tokenizer.padding_side = "right"

        self.model = model
        # Makes training faster but a little less accurate
        self.model.config.pretraining_tp = 1

        self.dataset = dataset

    @staticmethod
    def _flint_prompt_format(row) -> str:
        """
        Format the prompt automatically.

        :param row: The row conatining the data.
        :return: The prompt.
        """
        with open("tmp/eflint.txt", "r") as f:
            context = f.read()

        return f"""### Instruction: 
        Use the Task below and the Input given to write the Response:
        
        ### Task:
        Understand the concepts in the following text: {context}. Now translate the input into EFlint format.
        
        ### Input:
        {row['text']}
        ### Response:
        {row["flint"]}
        """

    @staticmethod
    def _dcpl_prompt_format(row) -> str:
        """
        Format the prompt automatically.

        :param row: The row conatining the data.
        :return: The prompt.
        """
        with open("tmp/dpcl.txt", "r") as f:
            context = f.read()

        return f"""### Instruction: 
            Use the Task below and the Input given to write the Response:

            ### Task:
            Understand the concepts in the following text: {context}. Now translate the input into EFlint format.

            ### Input:
            {row['text']}
            ### Response:
            {row["dcpl"]}
            """

    def get_trainer(self) -> Trainer:
        """
        Get the trainer for the model.

        :return: The trainer.
        """
        args = TrainingArguments(
            output_dir='output',
            num_train_epochs=1,
            per_device_train_batch_size=4,
            save_strategy="epoch",
            learning_rate=2e-4
        )

        peft_config = LoraConfig(
            lora_alpha=16,
            lora_dropout=0.1,
            r=64,
            bias="none",
            task_type="CAUSAL_LM",
        )

        match self._tpe:
            case "flint":
                func = self._flint_prompt_format
            case "dcpl":
                func = self._dcpl_prompt_format
            case _:
                raise ValueError(f"No prompt formatting defined for: {self._tpe}")

        trainer = SFTTrainer(
            model=self.model,
            train_dataset=self.dataset['train'],
            eval_dataset=self.dataset['test'],
            peft_config=peft_config,
            tokenizer=self.tokenizer,
            packing=True,
            formatting_func=func,
            args=args,
            max_seq_length=1024,
        )
        return trainer

    def change_type(self, new_tpe: str) -> None:
        """
        Change the type of norm language used with this trainer.

        :param new_tpe: The new type
        :raises ValueError: If the type supplied is not valid.
        """
        if any([new_tpe == tpe for tpe in ["flint", "dcpl"]]):
            self._tpe = new_tpe
        else:
            raise ValueError(f"The norm language of type: {new_tpe} is not supported.")
