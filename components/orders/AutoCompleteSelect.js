import { useState } from "react";
import AsyncSelect from "react-select/async";

export default function AutoCompleteSelect({
  onChange,
  filter,
  placeholder,
  isMulti = false,
  styles = {},
}) {
  const [option, setOption] = useState();
  return (
    <AsyncSelect
      isMulti={isMulti}
      defaultOptions
      cacheOptions
      value={option}
      styles={styles}
      placeholder={placeholder}
      loadOptions={filter}
      onChange={(options) => {
        setOption(options);
        onChange(options);
      }}
    />
  );
}
