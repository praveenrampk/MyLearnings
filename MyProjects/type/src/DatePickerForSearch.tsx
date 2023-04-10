import { FC, useState } from "react";

interface ChildProps {
    setFuntion: (input: string) => void;
}
const DatePickerForSearch: FC<ChildProps> = ({ setFuntion }) => {
    return (
        <div>
            <input className='input' type='date' onChange={(event) => {
                let date = event.target.value;
                let parts = date.split('-');
                let reversed = parts.reverse().join('/');
                setFuntion(reversed);
            }}/>
        </div>
    )
}
export default DatePickerForSearch;