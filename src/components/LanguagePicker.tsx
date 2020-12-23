import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getLang } from '../redux/actions';
let { Option } = Select;

export interface ILanguagePickerProps {
  getLang: any;
}

export const LanguagePicker: React.FC<ILanguagePickerProps> = ({ getLang }) => {
  const [lang, setLang] = useState(
    localStorage.getItem('el-todo-lang') || 'en'
  );

  useEffect(() => {
    getLang(lang);
  }, [lang]);

  const handleChangeSelect = (value: any) => {
    localStorage.setItem('el-todo-lang', value);
    setLang(value);
  };

  return (
    <div className='lang'>
      <Select
        className='lang__select'
        defaultValue={lang}
        bordered={false}
        onChange={handleChangeSelect}
      >
        <Option value='en'>English</Option>
        <Option value='ru'>Русский</Option>
      </Select>
    </div>
  );
};

export default connect(null, { getLang })(LanguagePicker);
