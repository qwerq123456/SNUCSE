import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.Stack;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.Arrays;
public class CalculatorTest
{
    public static void main(String args[])
    {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        while (true)
        {
            try
            {
                String input = br.readLine();
                if (input.compareTo("q") == 0)
                    break;

                command(input);
            }
            catch (Exception e)
            {
                System.out.print("ERROR\n");
            }
        }
    }
    private static void command(String input) {

        int size = input.length()+1;
        boolean isclose = false;
        Stack<String> stack = new Stack<>();
        String[] array = new String[size];
        int arrindex = 0;
        boolean isnum = false;
        long num = 0;
        int i=0;
        if(input.charAt(0)=='-'){
            stack.push("~");
            i=1;
            if(input.charAt(1)=='-'){
                i=1/0;
            }
        }
        for (; i < input.length(); i++) {
            if (input.charAt(i) == '0' || input.charAt(i) == '1' || input.charAt(i) == '2' || input.charAt(i) == '3' || input.charAt(i) == '4' || input.charAt(i) == '5' || input.charAt(i) == '6' || input.charAt(i) == '7' || input.charAt(i) == '8' || input.charAt(i) == '9') {
                if (isnum == false) {
                    isnum = true;
                    num = (long) input.charAt(i) - '0';
                } else {
                    num = num * 10 + (long) input.charAt(i) - '0';
                }
            }
            else if (input.charAt(i) == ' ') {
                continue;
            }
            else if (input.charAt(i) == '(' || input.charAt(i) == ')' || input.charAt(i) == '+' || input.charAt(i) == '-' || input.charAt(i) == '*' || input.charAt(i) == '/' || input.charAt(i) == '^' || input.charAt(i) == '%') {
                if (isnum == true) {
                    array[arrindex] = "" + num;
                    arrindex++;
                    num = 0;
                }
                if(stack.empty()){
                    stack.push(""+input.charAt(i));
                }

                else if(input.charAt(i)=='('){
                    stack.push("(");
                    isclose = true;
                }
                else if(input.charAt(i)==')'){
                    isclose = true;
                    while(!stack.peek().equals("(")){
                        array[arrindex] = stack.peek();
                        stack.pop();
                        arrindex++;
                    }
                    stack.pop();
                }
                else if(input.charAt(i)=='^'){
                    isclose=false;
                    while(priority(stack.peek())<=1){
                        array[arrindex] = stack.peek();
                        stack.pop();
                        arrindex++;
                        if(stack.empty()){
                            break;
                        }
                    }
                    stack.push("^");
                }
                else if(input.charAt(i)=='-'&&(isclose==false)&&(isnum==false)){
                    isclose=false;
                    while(priority(stack.peek())<=2){
                        array[arrindex] = stack.peek();
                        stack.pop();
                        arrindex++;
                        if(stack.empty()){
                            break;
                        }
                    }
                    stack.push("~");
                }
                else if(input.charAt(i) == '*'||input.charAt(i) == '%'||input.charAt(i) == '/'){
                    isclose=false;

                    while(priority(stack.peek())<=4){
                        array[arrindex] = stack.peek();
                        stack.pop();
                        arrindex++;
                        if(stack.empty()){
                            break;
                        }
                    }
                    stack.push(""+input.charAt(i));
                }
                else if(input.charAt(i) == '+'||input.charAt(i) == '-'){
                    isclose=false;

                    if(priority(stack.peek())<=5){
                        String a=stack.peek();
                        stack.pop();
                        array[arrindex] = a;
                        arrindex++;
                        stack.push(""+input.charAt(i));
                    }
                    else{
                        stack.push(input.charAt(i)+"");
                    }



                }
                else{
                    return; //return err
                }
                isnum = false;
            }
        }
        if(isnum) {
            array[arrindex] = num + "";
            arrindex++;
        }
        while(!stack.empty()) {
            String a = stack.peek();
            array[arrindex] = a;
            arrindex++;
            stack.pop();
        }
        Long a = result(array);
        for(int j=0; j<arrindex ;j++){
            System.out.print(array[j]+" ");
        }
        System.out.println();
        System.out.println(a);
    }

    static long result(String[] array) {
        String a;
        long num1, num2, num=0;
        Stack<Long> stack = new Stack<>();
        for(int i=0; array[i]!=null;i++){
            a = array[i];
            if (a.equals("+")) {
                num2 = stack.pop();
                num1 = stack.pop();
                num = num1 + num2;
                stack.push(num);
            } else if (a.equals("~")) {
                num2 = stack.pop();
                num = num2 * (-1);
                stack.push(num);
            } else if (a.equals("-")) {
                num2 = stack.pop();
                num1 = stack.pop();
                stack.push(num1 - num2);
            } else if (a.equals("*")) {
                num2 = stack.pop();
                num1 = stack.pop();
                stack.push(num1 * num2);
            } else if (a.equals("%")) {
                num2 = stack.pop();
                num1 = stack.pop();
                if(num2 ==0){
                   num2=1/0;
                }
                stack.push(num1 % num2);
            } else if (a.equals("/")) {
                num2 = stack.pop();
                num1 = stack.pop();
                if(num2 ==0){
                    num2=1/0;
                }
                stack.push(num1 / num2);
            } else if (a.equals("^")) {
                num2 = stack.pop();
                num1 = stack.pop();
                if(num1 == 0 && num2 < 0){
                    num2=1/0;
                }
                num = (long) Math.pow(num1, num2);
                stack.push(num);
            }
            else{
                stack.push(Long.parseLong(a));
            }
        }
        return stack.pop();
    }



    static int priority(String a){
        if(a.equals("(")){
            return 6;
        }
        else if(a.equals(")")){
            return 6;
        }
        else if(a.equals("^")){
            return 2;
        }
        else if(a.equals("~")){
            return 3;
        }
        else if(a.equals("*")||a.equals("/")||a.equals("%")){
            return 4;
        }
        else if(a.equals("+")||a.equals("-")){
            return 5;
        }
        else{
            return -1;
        }
    }
}