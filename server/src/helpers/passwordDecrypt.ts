import bcrypt from 'bcrypt';



const passwordDecrypt = async (data: string, password: string): Promise<boolean> => {
   try {

      const isMatch = await bcrypt.compare(data, password)

      if(!isMatch){
        return false
      }

      return true
   } catch (error) {
    console.log(error)
    return false
   }
}

export default passwordDecrypt
