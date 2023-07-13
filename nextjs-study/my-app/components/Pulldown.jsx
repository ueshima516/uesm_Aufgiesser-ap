import React, { useState } from 'react';
import GetPulldownItems from "./GetPulldownItems"


const SelectFormPage = ({ title }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };


    return (
        <div>
            <label htmlFor="select-option">{title}:</label>
            <select id="select-option" value={selectedOption} onChange={handleOptionChange}>
                <option value="">選択してください</option>
                {GetPulldownItems().map(
                    (item, index) => (
                        <option key={index} value={item}>
                            選択肢{item}
                        </option>)
                )
                }
            </select>
        </div>
    );
};

export default SelectFormPage;