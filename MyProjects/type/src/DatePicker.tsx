import { FC, useState } from "react";

interface ChildProps {
    setPicked: (input: boolean) => void;
    setSelectedValue: (input: string) => void;
    update: (input: string) => void;
}
const DatePicker: FC<ChildProps> = ({ setPicked, setSelectedValue, update }) => {
    return (
        <div>
            <input className='input' type='date' onChange={(event) => {
                let date = event.target.value;
                let parts = date.split('-');
                let reversed = parts.reverse().join('/');
                update(reversed);
                setPicked(false);
                setSelectedValue('date');
            }}/>
        </div>
    )
}
export default DatePicker;