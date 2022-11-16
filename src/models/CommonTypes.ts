export type Items = {
    name: string;
    resourceURI: string;
};

export type CharacterComics = {
    available: Number;
    collectionURI: string;
    items: Array<Items>;
};

export type Thumbnail = {
    extension: string;
    path: string;
};

export type Series = {
    available: Number;
    collectionURI: string;
    items: Array<Items>;
    returned: Number;
};

export type URL = {
    type: string,
    url: string
}