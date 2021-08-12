import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common'
import { CreateForkDto } from './dto/create-fork.dto'
import { UpdateForkDto } from './dto/update-fork.dto'
import { ForkService } from './fork.service'
import { Request } from 'express'
import { ForkDocument } from './schemas/fork.schema'
import { AuthGuard } from 'src/auth/auth.guard'

@UseGuards(AuthGuard)
@Controller('fork')
export class ForkController {
    constructor(private forkService: ForkService) {}

    @Get()
    getAll(): Promise<ForkDocument[]> {
        return this.forkService.getAll()
    }

    @Get(':category')
    getByCategory(
        @Param('category') category: string
    ): Promise<ForkDocument[]> {
        return this.forkService.getByCategory(category)
    }

    @Post()
    create(
        @Body() body: CreateForkDto,
        @Req() req: Request
    ): Promise<ForkDocument> {
        return this.forkService.create(body, req)
    }

    @Patch(':id')
    update(
        @Body() body: UpdateForkDto,
        @Param('id') id: string
    ): Promise<ForkDocument> {
        return this.forkService.update(id, body)
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<ForkDocument> {
        return this.forkService.remove(id)
    }
}
