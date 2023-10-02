import json
import jsonschema

def main():
    with open('DPCLschema.json') as schemaFile:
        schema = json.load(schemaFile)
        v = jsonschema.Draft202012Validator.check_schema(schema)
        print("Schema is valid")

    with open('DPCLexamples.json') as dataFile:
        data = json.load(dataFile)
        jsonschema.Draft202012Validator(schema).validate(data)
        print("Validation of test set passed.")

    with open('code.json') as dataFile:
        data = json.load(dataFile)
        jsonschema.Draft202012Validator(schema).validate(data)
        print("Validation passed.")

if __name__ == '__main__':
    main()