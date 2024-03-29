import openai
from pathlib import Path

FLINT_MODEL = "ft:gpt-3.5-turbo-1106:dsp-project::8hHiGRcA"
DPCL_MODEL = "ft:gpt-3.5-turbo-1106:dsp-project::8hIXYrQs"
ARGS = {"temperature": 0.6, "max_tokens": 512}

path = "\\".join(str(Path(__file__).absolute()).split("\\")[:-2])
openai.api_key_path = f"{path}/openai_endpoints/.api_key"


def request_gpt(promt: str, norm_type: str) -> dict:
    """
    Request a response from gpt endpoints.

    :param promt: The promt in use
    :param norm_type: The norm type.
    :return: The response.
    :raises KeyError: If norm is not supported.
    """
    match norm_type:
        case "flint":
            response = openai.ChatCompletion.create(
                model=FLINT_MODEL,
                messages=promt,
                **ARGS
            )
        case "dcpl" | "dpcl":
            response = openai.ChatCompletion.create(
                model=DPCL_MODEL,
                messages=promt,
                **ARGS
            )
        case _:
            raise KeyError(f"No such norm defined: {norm_type}")
    return response
