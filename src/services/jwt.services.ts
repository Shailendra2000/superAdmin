import jwt, { JwtPayload }  from 'jsonwebtoken'

export class jwtServices{
    public generateJwtToken=(email:string)=>{
        const payload = { Email: email };
        const secretKey = 'mysecretkey';
        const options = { expiresIn: '24h' }
        const token = jwt.sign(payload, secretKey,options);
        return token
    }
    public verifyToken(token:string){
        try{
            const secretKey = 'mysecretkey';
            const decodeResult=jwt.verify(token, secretKey) as JwtPayload
            return decodeResult
        }
        catch(err){
            console.error(err);
            return null
        }
    }
}

