class AWSEvent {

    static discriminator = undefined;

    static detail = "detail";

    static genericType = "T";

    static attributeTypeMap = [
        {
            "name": AWSEvent.detail,
            "baseName": AWSEvent.detail,
            "type": AWSEvent.genericType
        },
        {
            "name": "detail_type",
            "baseName": "detail-type",
            "type": "string"
        },
        {
            "name": "resources",
            "baseName": "resources",
            "type": "Array<string>"
        },
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        },
        {
            "name": "source",
            "baseName": "source",
            "type": "string"
        },
        {
            "name": "time",
            "baseName": "time",
            "type": "Date"
        },
        {
            "name": "region",
            "baseName": "region",
            "type": "string"
        },
        {
            "name": "version",
            "baseName": "version",
            "type": "string"
        },
        {
            "name": "account",
            "baseName": "account",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return AWSEvent.attributeTypeMap;
    }

    static updateAttributeTypeMapDetail(type) {
        var index = AWSEvent.attributeTypeMap.indexOf({name: AWSEvent.detail, baseName: AWSEvent.detail, type: AWSEvent.genericType});
        this.attributeTypeMap[index] = {name: AWSEvent.detail, baseName: AWSEvent.detail, type};
    }
}

module.exports = {
    AWSEvent
}




