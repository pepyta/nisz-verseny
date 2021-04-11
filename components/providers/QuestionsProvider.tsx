import QuestionsWrapper from "@lib/client/wrapper/questions";
import { CreateAnswerResponseType } from "@pages/api/questions/answer";
import { GetQuestionsResponseType } from "@pages/api/questions/get";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";

type QuestionsContextType = {
    questions: GetQuestionsResponseType;
    setQuestions: Dispatch<SetStateAction<GetQuestionsResponseType>>;
}

const QuestionsContext = createContext<QuestionsContextType>(null);

export const useQuestions = () => {
    const { questions, setQuestions } = useContext(QuestionsContext);

    return {
        questions,
        addQuestion: (question: GetQuestionsResponseType[0]) => setQuestions([question, ...questions]),
        addAnswer: (answer: CreateAnswerResponseType) => {
            const newQuestions = [...questions];

            for(let i = 0; i < newQuestions.length; i++){
                if(questions[i].id === answer.questionId) {
                    questions[i].answers.push(answer);
                    break;
                }
            }

            setQuestions(newQuestions);
        },
        markAsAnswer: (answer: CreateAnswerResponseType) => {
            const newQuestions = [...questions];

            for(let i = 0; i < newQuestions.length; i++){
                if(questions[i].id === answer.questionId) {
                    for(let j = 0; j < questions[i].answers.length; i++) {
                        const answ = questions[i].answers[j];

                        if(answ.id === answer.id) {
                            answ.marked = true;
                        }
                    }
                }
            }

            setQuestions(newQuestions);
        },
    }
};

const QuestionsProvider = ({ children }: PropsWithChildren<{}>) => {
    const [questions, setQuestions] = useState<GetQuestionsResponseType>([]);
    const wrapper = new QuestionsWrapper();

    const load = async () => {
        try {
            const resp = await wrapper.get();
            setQuestions(resp.data);
        } catch {}
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <QuestionsContext.Provider value={{ questions, setQuestions}}>
            {children}
        </QuestionsContext.Provider>
    );
};

export default QuestionsProvider;