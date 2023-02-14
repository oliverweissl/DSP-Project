# DPCL json schema

DPCL is a domain specific language that serves as an information model for specififying norms.
As the discussions on normative concepts are still hot in the dedicated literature, DPCL remains neutral with respect to the actual semantics, yet aims to provide a minimal common ground to encode other normative computational artefacts.

- `DPCLschema.json` contains the current version of the information model as a JSON schema.
- `DPCLexamples.json` contains examples of code that are validated by the schema
- `DPCLtest.py` is a simple script based on `jsonschema` used to validate DPCL code in the file `code.json` against the schema.

## Dependencies

```
pip install jsonschema
```
