import { NestFactory } from '@nestjs/core'
import * as cors from 'cors'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.use(
        cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true,
        }),
    )
    await app.listen(3000)
}
bootstrap()
