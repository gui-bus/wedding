"use client";
import * as Select from "@radix-ui/react-select";
import { CaretDownIcon, CaretUpIcon, CheckIcon } from "@phosphor-icons/react";
export type WeddingSelectOption = { value: string; label: string; disabled?: boolean };
export function WeddingSelect({ value, onValueChange, options, placeholder = "Selecione uma opção", label, id, disabled, required, className = "" }: { value: string; onValueChange: (value: string) => void; options: WeddingSelectOption[]; placeholder?: string; label?: string; id?: string; disabled?: boolean; required?: boolean; className?: string }) {
  return <Select.Root value={value} onValueChange={onValueChange} disabled={disabled} required={required}>
    <Select.Trigger id={id} className={"guest-input wedding-select-trigger " + className} aria-label={label}><Select.Value placeholder={placeholder} /><Select.Icon><CaretDownIcon size={15} weight="bold" aria-hidden="true" /></Select.Icon></Select.Trigger>
    <Select.Portal><Select.Content className="wedding-select-content" position="popper" sideOffset={7} collisionPadding={12}><Select.ScrollUpButton className="wedding-select-scroll"><CaretUpIcon size={15} aria-hidden="true" /></Select.ScrollUpButton><Select.Viewport className="wedding-select-viewport">{options.map(option => <Select.Item key={option.value} value={option.value} disabled={option.disabled} className="wedding-select-item"><Select.ItemText>{option.label}</Select.ItemText><Select.ItemIndicator className="wedding-select-check"><CheckIcon size={15} weight="bold" aria-hidden="true" /></Select.ItemIndicator></Select.Item>)}</Select.Viewport><Select.ScrollDownButton className="wedding-select-scroll"><CaretDownIcon size={15} aria-hidden="true" /></Select.ScrollDownButton></Select.Content></Select.Portal>
  </Select.Root>;
}
