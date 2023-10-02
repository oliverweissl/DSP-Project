import pfrl
import jsonschema
from jsonschema.exceptions import ValidationError
from textrl import TextRLEnv, TextRLActor, train_agent_with_evaluation
from transformers import AutoModelForCausalLM, AutoTokenizer
import logging
import sys
import json

logging.basicConfig(level=logging.INFO, stream=sys.stdout, format='')
checkpoint = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
model = AutoModelForCausalLM.from_pretrained(checkpoint, torch_dtype="auto", device_map="auto")
model = model.cuda()

with open("./dcpl_ressources/DCPLschema.json") as schema_file:
    SCHEMA = json.load(schema_file)

class RlEnv(TextRLEnv):
    def get_reward(self, input_item, predicted_list, finish) -> float:
        reward = 0.0
        try:
            jsonschema.Draft202012Validator(SCHEMA).validate("".join(predicted_list))
            reward = 1.0
        except ValidationError:
            pass
        return reward


