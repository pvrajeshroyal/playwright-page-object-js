class Login{

    constructor(page) {
        this.page = page;
        this.useEmailPasswordButton = page.locator('button.btn-auth').first();
        this.userNameField = page.locator('input#username');
        this.passwordField = page.locator('input#password');
        this.submitButton = page.locator('button.btn-auth');
    } 
  
    async signIn(username,password){
      await this.useEmailPasswordButton.click();
      await this.userNameField.fill(username);  
      await this.userNameField.press('Tab');  
      await this.passwordField.fill(password);  
      await this.submitButton.click();
    }
}

module.exports=Login