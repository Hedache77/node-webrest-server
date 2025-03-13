

export class CreatedTodoDto {

    private constructor(
        public readonly text: string
    ){}

    static create( props: {[key:string]: any} ): [string?, CreatedTodoDto?] {
        const { text } = props;
        if(!text) ['Text property is required'];

        return [undefined, new CreatedTodoDto(text)];
    }


}