# DPCL json schema

DPCL is a DSL language that serves primarily as an information model for specififying norms.
Because the discussion on what normative concepts are, and what they mean is still hot in the literature, DPCL 
remains neutral with respect to the actual semantics, yet aims to provide a minimal common ground to encode other normative computational artefacts.

- `DPCLschema.json` contains the current version of the information model as a JSON schema.
- `DPCLcode.json` contains examples of code that are validated by the schema
- `DPCLtest.py` is a simple script based on `jsonschema` used to validate DPCL code against the schema.

## Dependencies

```pip install jsonschema```