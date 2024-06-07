import { useEffect } from "react";
import { EditFormInputs } from '../editFormInputs/editFormInputs';
import { EditFormButtons } from '../editWordButtons/editWordButtons';

type EditFormProps = {
    setRussian: (value: string) => void;
    setEnglish: (value: string) => void;
    english: string;
    russian: string;
    handleSave: () => void;
    resetEdit: () => void;
}

export const EditWordForm = (props: EditFormProps) => {
    useEffect(() => {
        props.setRussian(props.russian);
    }, [props.russian]);

    useEffect(() => {
        props.setEnglish(props.english);
    }, [props.english]);

    return (
        <form>
            <EditFormInputs
                russian={props.russian}
                english={props.english}
                setRussian={props.setRussian}
                setEnglish={props.setEnglish}
            />
            <EditFormButtons 
                handleSave={props.handleSave} 
                resetEdit={props.resetEdit} 
            />
        </form>
    );
}