import React, { useState } from 'react';
import PulldownGetItems from "./PulldownGetItems"


const SelectFormPage = ({ title }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

// TODO 選択してください のvalue ""とnullどっちが良いのかな てかJSってnullとかあったっけ
    return (
        <div>
            <label htmlFor="select-option">{title}:</label>
            <select id="select-option" value={selectedOption} onChange={handleOptionChange}>
                <option value="">選択してください</option>
                {PulldownGetItems().map(
                    (item, index) => (
                        <option key={index}>選択肢 {item}</option>)
                )}
            </select>
        </div>
    );
};

export default SelectFormPage;