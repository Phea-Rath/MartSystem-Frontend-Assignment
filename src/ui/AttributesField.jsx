import React from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import Button from './Button';
import Input from './Input';

const AttributesField = ({ attributes = [], onChange }) => {
    const addAttribute = () => {
        onChange([...attributes, { id: Date.now(), name: '', value: '' }]);
    };

    const updateAttribute = (index, field, value) => {
        const updated = [...attributes];
        updated[index][field] = value;
        onChange(updated);
    };

    const removeAttribute = (index) => {
        const updated = attributes.filter((_, i) => i !== index);
        onChange(updated);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                    Additional Attributes
                </label>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addAttribute}
                    icon={FaPlus}
                >
                    Add Attribute
                </Button>
            </div>

            <div className="space-y-3">
                {attributes.map((attr, index) => (
                    <div key={attr.id} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Input
                                placeholder="Attribute name (e.g., Color, Size, Weight)"
                                value={attr.name}
                                onChange={(e) => updateAttribute(index, 'name', e.target.value)}
                                className="bg-white"
                            />
                            <Input
                                placeholder="Value (e.g., Red, XL, 1.5kg)"
                                value={attr.value}
                                onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                                className="bg-white"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeAttribute(index)}
                            className="text-red-600 hover:text-red-800 p-2"
                            title="Remove attribute"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}

                {attributes.length === 0 && (
                    <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                        <FaEdit className="text-gray-400 text-2xl mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">No attributes added yet</p>
                        <p className="text-gray-400 text-xs mt-1">
                            Add custom attributes like Color, Size, Material, etc.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttributesField;