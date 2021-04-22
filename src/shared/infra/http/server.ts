import { http } from './http';
import './websockets/client';

http.listen(3333, () => {
    console.log('Server ta open!!');
});
