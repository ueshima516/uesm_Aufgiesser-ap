import React, { useState } from 'react';

const SelectFormPage = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div>
            {/* <h1>入力フォーム</h1> */}
            {/* TODO フォーム名は変数にする */}
            <label htmlFor="select-option">種目:</label>
            <select id="select-option" value={selectedOption} onChange={handleOptionChange}>
                <option value="">選択してください</option>

                {/* TODO 選択肢は受け取る */}
                <option value="option1">オプション1</option>
                <option value="option2">オプション2</option>
                <option value="option3">オプション3</option>
            </select>
            {/* <p>選択された項目: {selectedOption}</p> */}
        </div>
    );
};

export default SelectFormPage;