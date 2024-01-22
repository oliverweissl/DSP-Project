def gpt_promt(row, target: str, testing: bool = False) -> dict:
    """
    Format to jsonl.

    :param row: The row.
    :param target: The targeted cell.
    :param testing: Whether this prompt is used for testing.
    :return: The full prompt.
    """
    match target:
        case "flint":
            with open("../assets/eflint.txt", "r") as f:
                tpe = "eFlint"
                context = f.read()
        case "dcpl":
            with open("../assets/dpcl.txt", "r") as f:
                tpe = "DPCL"
                context = f.read()
        case _:
            raise ValueError("No such norm type known")

    msg = {
        "messages": [
            {
                "role": "system",
                "content": f"NormGPT is a chatbot that translates Natural Language into Norm languages. You are tasked to tanslate into {tpe} format. Understand the following concepts: {context}."
            },
            {
                "role": "user",
                "content": f"Translate the following Norm into {tpe}: {row['text']}"
            }
        ]
    }
    if not testing:
        msg["messages"].append(
            {
                "role": "assistant",
                "content": row[target]
            }
        )
    return msg
