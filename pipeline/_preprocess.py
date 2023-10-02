import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
nltk.download('stopwords')


STOP_WORDS = set(stopwords.words('english'))


def remove_stop_words(text: str) -> str:
    word_tokens = word_tokenize(text)
    filtered_sentence = [w for w in word_tokens if not w.lower() in STOP_WORDS]
    return " ".join(filtered_sentence)