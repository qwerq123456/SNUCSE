import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.Arrays;
public class BigInteger
{
    public static final String QUIT_COMMAND = "quit";
    public static final String MSG_INVALID_INPUT = "입력이 잘못되었습니다.";

    // implement this
    public static final Pattern EXPRESSION_PATTERN = Pattern.compile("");

    byte[] data = new byte[100];

    public BigInteger(byte[] arr){
        this.data = arr;
    }
    public BigInteger(String s) {
        String reverse = new StringBuilder(s).reverse().toString();

        try {

            this.data = reverse.getBytes("UTF-8");

        }catch(UnsupportedEncodingException e){

            e.printStackTrace();

        }

    }
    public BigInteger add(BigInteger big)
    {   byte[] data_result = new byte[100];
        byte temp;
        byte upper = 0;
        int i = 0;

        if(this.data.length >= big.data.length){
            for(; i<= big.data.length-1; i++){
                temp = (byte) (upper + big.data[i]+ this.data[i]-96);
                data_result[i] = (byte)(temp%10);
                upper = (byte)(temp/10);
            }
            for( ; i<= this.data.length-1; i++){
                temp = (byte) (upper + this.data[i]-48);
                data_result[i] = (byte)(temp%10);
                upper = (byte)(temp/10);
            }
        }
        else{
            for( ; i <= this.data.length-1 ; i++){
                temp = (byte) (upper + big.data[i] + this.data[i]-96);
                data_result[i] = (byte)(temp%10);
                upper = (byte)(temp/10);
            }
            for( ; i <= big.data.length -1 ; i++){
                temp = (byte) (upper + big.data[i]-48);
                data_result[i] = (byte)(temp%10);
                upper = (byte)(temp/10);
            }
        }
        if(upper == 1) {
            data_result[i] = upper;
        }
        else{
            i--;
        }

        data_result = reversearray(data_result,i);

        BigInteger result = new BigInteger(data_result);

        return result;

    }

    public BigInteger subtract(BigInteger big)
    {
        byte[] data_result = new byte[100];
        byte temp;
        byte upper =0;
        int i = 0;
        if(this.data.length >= big.data.length) {
            for (; i <= big.data.length - 1; i++) {
                temp = (byte) (this.data[i] - big.data[i] + upper);
                upper = (byte) ((temp - 9) / 10);
                data_result[i] = (byte) (temp - upper * 10);
            }
            for (; i <= this.data.length - 1; i++) {
                temp = (byte) (this.data[i] + upper - 48);
                upper = (byte) ((temp - 9) / 10);
                data_result[i] = (byte) (temp - upper * 10);
            }
            if (upper == -1) {
                System.out.print("-");
                i=0;
                upper =0;
                for (; i <= this.data.length - 1; i++) {
                    temp = (byte) (big.data[i] - this.data[i] + upper);
                    upper = (byte) ((temp - 9) / 10);
                    data_result[i] = (byte) (temp - upper * 10);
                }
            }
        }
        else{
                System.out.print("-");
            for( ;i<=this.data.length-1; i++){
                temp = (byte)(big.data[i]-this.data[i]+upper);
                upper = (byte)((temp-9)/10);
                data_result[i] = (byte)(temp-upper*10);

            }
            for( ; i<=big.data.length-1; i++){
                temp = (byte)(big.data[i]+upper-48);
                upper = (byte)((temp-9)/10);
                data_result[i] = (byte)(temp-upper*10);
            }
            i--;
        }

        data_result = reversearray(data_result,i);

        BigInteger result = new BigInteger(data_result);
        return result;
    }

    public BigInteger multiply(BigInteger big)
    {
        int i = 0;
        byte mul_num;
        byte[] arr = new byte[] {0};
        BigInteger zero = new BigInteger(arr);
        BigInteger sum = new BigInteger(arr);
        for( ; i<this.data.length;i++){
            sum = sum.mul10();
            mul_num = (byte)(this.data[i]-48);
            for( ; mul_num>0 ;  ){
                mul_num = (byte)(mul_num-1);
                sum = sum.add(zero);
                sum = sum.add(big);
            }
        }
        return sum;
    }
    public BigInteger mul10(){
        int i = this.data.length+1;
        byte[] data_mul10 = new byte[i];
        for(int j =0; j<this.data.length;j++){
            data_mul10[j]=this.data[j];
        }
        data_mul10[i-1]=0;
        BigInteger result = new BigInteger(data_mul10);
        return result;
    }
    @Override
    public String toString() {
        String s ="";
        int i=0;
        boolean is_zero = false;
        for(; i<this.data.length; i++){
            if(this.data[i]!=0){
                is_zero = true;
            }
            if(is_zero) {
                s+=data[i];
            }
        }
        if(!is_zero){
            return "0";
        }
        return s;
    }

    public byte[] reversearray(byte[] arr, int i){
        byte[] reverse = new byte[i+1];
        for(int j = 0; j <= i; j++){
            reverse[j] = arr[i-j];
        }
        return reverse;
    }

    static BigInteger evaluate(String input) throws IllegalArgumentException
    {
        input = input.replace(" ","");
        //input 에서 두개의 스트링으로 분리 arg1, arg2
        boolean firstinput = input.charAt(0) == '-';
        //1234567890제거후 넣기
        String sign = input.replaceAll("[0-9]","");
        String[] arg = {"","","",""};
        arg = input.split("[+*-]");
        BigInteger num1;
        BigInteger num2;
        if(sign.compareTo("+")==0||sign.compareTo("-")==0||sign.compareTo("*")==0){
            num1 = new BigInteger(arg[0]);
            num2 = new BigInteger(arg[1]);
        }
        else if(sign.compareTo("-+-")==0||sign.compareTo("---")==0||sign.compareTo("-*-")==0){
            num1 = new BigInteger(arg[1]);
            num2 = new BigInteger(arg[3]);
        }
        else if(sign.compareTo("+-")==0||(!firstinput&&sign.compareTo("--")==0)||sign.compareTo("*-")==0){
            num1 = new BigInteger(arg[0]);
            num2 = new BigInteger(arg[2]);
        }
        else{
            num1 = new BigInteger(arg[1]);
            num2 = new BigInteger(arg[2]);
        }

        BigInteger result;

        if(sign.compareTo("+-")==0 ||sign.compareTo("-")==0){
            result = num1.subtract(num2);
        }
        else if(sign.compareTo("-+")==0||sign.compareTo("---")==0){
            result = num2.subtract(num1);
        }
        else if(sign.compareTo("+")==0||sign.compareTo("--")==0||sign.compareTo("-+-")==0){
            if(firstinput){
                System.out.print("-");
            }
            result = num1.add(num2);
        }
        else{
            if(sign.compareTo("-*")==0||sign.compareTo("-*")==0){
                System.out.print("-");
            }
            result = num1.multiply(num2);
        }
        return result;
        // implement here
        // parse input
        // using regex is allowed
        // One possible implementation
        // BigInteger result = num1.add(num2);
        // return result;
    }

    public static void main(String[] args) throws Exception
    {
        try (InputStreamReader isr = new InputStreamReader(System.in))
        {
            try (BufferedReader reader = new BufferedReader(isr))
            {
                boolean done = false;
                while (!done)
                {
                    String input = reader.readLine();

                    try
                    {
                        done = processInput(input);
                    }
                    catch (IllegalArgumentException e)
                    {
                        System.err.println(MSG_INVALID_INPUT);
                    }
                }
            }
        }
    }

    static boolean processInput(String input) throws IllegalArgumentException
    {
        boolean quit = isQuitCmd(input);

        if (quit)
        {
            return true;
        }
        else
        {
            BigInteger result = evaluate(input);
            System.out.println(result.toString());

            return false;
        }
    }

    static boolean isQuitCmd(String input)
    {
        return input.equalsIgnoreCase(QUIT_COMMAND);
    }
}
