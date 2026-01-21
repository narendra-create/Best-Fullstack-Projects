import React from "react";

const repeatUntilEnough = (items, minCount = 8) => {
    if (!items || items.length === 0) return [];

    const result = [];
    while (result.length < minCount) {
        result.push(...items);
    }
    return result;
};

export default repeatUntilEnough;