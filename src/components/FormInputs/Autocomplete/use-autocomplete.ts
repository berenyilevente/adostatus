import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

export const useAutocomplete = ({
  suggestions,
  onChange,
}: {
  suggestions: string[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event);
    const newInputValue = event.target.value;
    setInputValue(newInputValue);

    if (newInputValue) {
      const uniqueSuggestions = Array.from(new Set(suggestions));
      const newFilteredSuggestions = uniqueSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(newInputValue.toLowerCase())
      );
      setFilteredSuggestions(newFilteredSuggestions);
      return;
    }

    setFilteredSuggestions([]);
  };

  const onSelect = (suggestion: string) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
  };

  const onClearInput = () => {
    setInputValue("");
    setFilteredSuggestions([]);
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<any, string>
  ) => {
    if (event.code === "ArrowDown") {
      setActiveSuggestionIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
      return;
    }

    if (event.code === "ArrowUp") {
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : 0));
      return;
    }

    if (event.code === "Enter") {
      event.preventDefault();
      field.onChange(filteredSuggestions[activeSuggestionIndex]);
      onSelect(filteredSuggestions[activeSuggestionIndex]);
      setActiveSuggestionIndex(0);
    }
  };

  return {
    inputValue,
    filteredSuggestions,
    activeSuggestionIndex,
    onInputChange,
    onSelect,
    onClearInput,
    onKeyDown,
  };
};
