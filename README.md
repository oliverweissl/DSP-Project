# DPCL json schema

DPCL (*duty, power, claim and liability*, or *duty/power computer language*) is a domain specific language that serves as an information model for specififying norms. As the discussions on normative concepts are still hot in the dedicated literature, DPCL remains neutral with respect to the actual semantics, yet aims to provide a minimal common ground to encode normative computational artefacts.

For a fast comparison:
- DPCL like ODRL aims to provive primarily an informational model, and is JSON-centred, but DPCL include powers
- DPCL like FLINT/eFLINT takes as primitives the normative frames based on Hohfeld framework, but DPCL strictly separates conditional aspects
- DPCL like Logical English takes as primitives transformational and reactive rules to deal with conditional aspects, but DPCL includes normative relations

This repository contains a JSON schema validating a DPCL program encoded in a json file.

## Files

- `DPCLschema.json` contains the current version of the information model as a JSON schema.
- `DPCLexamples.json` contains examples of code that are validated by the schema
- `DPCLtest.py` is a simple script based on `jsonschema` used to validate DPCL code in the file `code.json` against the schema.

## Dependencies

```
pip install jsonschema
```

## References

Sileno, G., van Binsbergen, T., Pascucci, M., van Engers, T., 
*DPCL: a Language Template for Normative Specifications*, 
Workshop on Programming Languages and the Law (ProLaLa 2022), co-located with POPL 2022
https://arxiv.org/abs/2201.04477
