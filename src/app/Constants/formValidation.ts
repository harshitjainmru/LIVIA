import { Validators } from "@angular/forms";

export class validation {
   public static INPUT_REQUIRED=Validators.required
   public static EMAIL={
      EMAIL_PATTERN: Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
      EMAIL_email:Validators.email
   }
   
   public static PASSWORD={
       PASSWORD_LENGTH:Validators.minLength(6),
       PASSWORD_PATTERN:Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
   }
   public static NAME={
        NAME_LENGTH:Validators.minLength(3),
        NAME_PATTERN:Validators.pattern(/^[?!\S][a-zA-Z\s]+$/)
   }
   public static PHONE_NO=Validators.pattern("^[7][9][0-9]{7}$")
   
}