import pandas as pd
import numpy as np
from ._gpt_promt import gpt_promt


def prepare_gpt_dataset(path: str) -> None:
    """
    Prepare dataset for gpt3.5 fine-tuning.

    :param path: the path of the dataset.
    """
    df = pd.read_csv(path)
    df["flint_json"] = df.apply(lambda row: gpt_promt(row, "flint"), axis=1)
    df["dpcl_json"] = df.apply(lambda row: gpt_promt(row, "dcpl"), axis=1)

    msk = np.random.rand(len(df)) < 0.85
    train, test = df[msk], df[~msk]

    train["flint_json"].to_json("train_flint_gpt.jsonl", orient="records", lines=True)
    train["dpcl_json"].to_json("train_dpcl_gpt.jsonl", orient="records", lines=True)
    test["flint_json"].to_json("val_flint_gpt.jsonl", orient="records", lines=True)
    test["dpcl_json"].to_json("val_dpcl_gpt.jsonl", orient="records", lines=True)
    print("Finished populating dataset.")
