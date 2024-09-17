import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty()
    productId: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    status: string;
}
