class OrderNotification {
    static discriminator = undefined;

    static attributeTypeMap = [
        {
            "name": "category",
            "baseName": "category",
            "type": "string"
        },
        {
            "name": "location",
            "baseName": "location",
            "type": "string"
        },
        {
            "name": "value",
            "baseName": "value",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return OrderNotification.attributeTypeMap;
    }
}

module.exports = {
    OrderNotification
};


