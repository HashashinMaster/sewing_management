import { useState } from "react";
import AsyncSelect from "react-select/async";

export default function AutoCompleteSelect({
  onChange,
  filter,
  placeholder,
  isMulti = false,
}) {
  const [option, setOption] = useState();
  return (
    <AsyncSelect
      isMulti={isMulti}
      defaultOptions
      cacheOptions
      value={option}
      placeholder={placeholder}
      loadOptions={filter}
      onChange={(options) => {
        setOption(options);
        onChange(options);
      }}
    />
  );
}
