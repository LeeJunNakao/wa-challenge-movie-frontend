export const toCamelCase = (text: string) => {
    const words = text.split("_");

    const camelCaseWord = (word: string) =>
        word
            .split("")
            .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
            .join("");

    const capitalizedWords = words
        .map((word, index) => (index === 0 ? word : camelCaseWord(word)))
        .join("");

    return capitalizedWords;
};

type ParsingObj = { [k: string]: any }

export const toCamelCaseObject = <T extends ParsingObj>(
    obj: { [k: string]: any },
    parsingObj: ParsingObj = {}
): T => {
    const keys = Object.keys(obj);

    const parseObject = (key: string, parsingObj: ParsingObj) => {
        parsingObj[toCamelCase(key)] = {};
        toCamelCaseObject(obj[key], parsingObj[toCamelCase(key)]);
    };

    const parseArray = (key: string, value: any[]) => {
        parsingObj[toCamelCase(key)] = value.map((v) => toCamelCaseObject(v, {}));
    };

    keys.forEach((key) => {
        const value = obj[key];
        if (typeof value === "object" && value) {
            if (!Array.isArray(value)) {
                parseObject(key, parsingObj);
            }
            if (Array.isArray(value)) {
                parseArray(key, value);
            }
        } else {
            parsingObj[toCamelCase(key)] = value;
        }
    });

    return parsingObj as T;
};
