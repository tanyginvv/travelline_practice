namespace Dictionary
{
    class Program
    {
        static Dictionary<string, string> translations = new Dictionary<string, string>();
        const string INPUT_FILE = "translations.txt";
        const string MENU = "\nМеню:\n1. Добавить перевод\n2. Удалить перевод\n" +
            "3. Изменить перевод\n4. Перевести слово с русского на английский\n" +
            "5. Перевести слово с английского на русский\n6. Показать весь словарь\n7. Выйти\nВыберите действие: ";
        const string FILE_NOT_FOUND = "Файл не найден";
        const string START_MESSAGE = "Добро пожаловать в Переводчик!";
        const string ERROR_COMMAND = "Неверный ввод комманды, попробуйте снова.";
        const string ADD_TRANSLATE_RU = "Введите слово на русском: ";
        const string ADD_TRANSLATE_EN = "Введите его перевод на английский: ";
        const string SUCCESS_ADD_TRANSLATE = "Перевод добавлен успешно.";
        const string DELETE_TRANSLATE = "Введите слово на русском для удаления перевода: ";
        const string SUCCESS_DELETE_TRANSLATE = "Перевод удалён успешно.";
        const string CHANGE_TRANSLATE = "Введите слово на русском для изменения перевода: ";
        const string SUCCESS_CHANGE_TRANSLATE = "Перевод изменён успешно.";
        const string RU_TO_EN = "Введите слово на русском для перевода: ";
        const string EN_TO_RU = "Введите слово на английском для перевода: ";
        const string CHANGE_EN = "Введите новый перевод на английский: ";
        const string NOT_FIND_TRANSLATE = "Перевод не найден";
        const string ERROR_ADD_TRANSLATE = "Перевод для этого слова уже существует.";
        const string END_MESSAGE = "До свидания!";
        static void Main(string[] args)
        {
            LoadTranslations(); 

            Console.WriteLine(START_MESSAGE);

            while (true)
            {
                Console.Write(MENU);

                string choice = Console.ReadLine();

                switch (choice)
                {
                    case "1":
                        AddTranslation();
                        break;
                    case "2":
                        RemoveTranslation();
                        break;
                    case "3":
                        ChangeTranslation();
                        break;
                    case "4":
                        TranslateWordRuToEn();
                        break;
                    case "5":
                        TranslateWordEnToRu();
                        break;
                    case "6":
                        PrintDictionary();
                        break;
                    case "7":
                        SaveTranslations(); 
                        Console.WriteLine(END_MESSAGE);
                        return;
                    default:
                        Console.WriteLine(ERROR_COMMAND);
                        break;
                }
            }
        }

        static void PrintDictionary()
        {
            foreach (var str in translations)
            {
                Console.WriteLine($"{str.Key} - {str.Value}");
            };
        }

        static void AddTranslation()
        {
            Console.Write(ADD_TRANSLATE_RU);
            string word = Console.ReadLine().ToLower();

            Console.Write(ADD_TRANSLATE_EN);
            string translation = Console.ReadLine().ToLower();

            if (!translations.ContainsKey(word))
            {
                translations.Add(word, translation);
                Console.WriteLine(SUCCESS_ADD_TRANSLATE);
            }
            else
            {
                Console.WriteLine(ERROR_ADD_TRANSLATE);
            }
        }

        static void RemoveTranslation()
        {
            Console.Write(DELETE_TRANSLATE);
            string word = Console.ReadLine().ToLower();

            if (translations.ContainsKey(word))
            {
                translations.Remove(word);
                Console.WriteLine(SUCCESS_DELETE_TRANSLATE);
            }
            else
            {
                Console.WriteLine(NOT_FIND_TRANSLATE);
            }
        }

        static void ChangeTranslation()
        {
            Console.Write(CHANGE_TRANSLATE);
            string word = Console.ReadLine().ToLower();

            if (translations.ContainsKey(word))
            {
                Console.Write(CHANGE_EN);
                string newTranslation = Console.ReadLine().ToLower();
                translations[word] = newTranslation;
                Console.WriteLine(SUCCESS_CHANGE_TRANSLATE);
            }
            else
            {
                Console.WriteLine(NOT_FIND_TRANSLATE);
            }
        }

        static void TranslateWordRuToEn()
        {
            Console.Write(RU_TO_EN);
            string word = Console.ReadLine().ToLower();

            if (translations.ContainsKey(word))
            {
                Console.WriteLine($"Перевод на английский: {translations[word]}");
            }
            else
            {
                Console.WriteLine(NOT_FIND_TRANSLATE);
            }
        }

        static void TranslateWordEnToRu()
        {
            Console.Write(EN_TO_RU);
            string word = Console.ReadLine().ToLower();

            var translationPair = translations.FirstOrDefault(pair => pair.Value == word);

            if (!string.IsNullOrEmpty(translationPair.Key))
            {
                Console.WriteLine($"Перевод на русский: {translationPair.Key}");
            }
            else
            {
                Console.WriteLine(NOT_FIND_TRANSLATE);
            }
        }

        static void LoadTranslations()
        {
            try
            {
                using (StreamReader sr = new StreamReader(INPUT_FILE))
                {
                    string line;
                    while ((line = sr.ReadLine()) != null)
                    {
                        string[] parts = line.Split('-');
                        if (parts.Length == 2)
                        {
                            translations[parts[0].Trim()] = parts[1].Trim();
                        }
                    }
                }
            }
            catch (FileNotFoundException)
            {
                Console.WriteLine(FILE_NOT_FOUND);
            }
        }

        static void SaveTranslations()
        {
            using (StreamWriter sw = new StreamWriter(INPUT_FILE))
            {
                foreach (var word in translations)
                {
                    sw.WriteLine($"{word.Key} - {word.Value}");
                }
            }
        }
    }
}
