def calculator():
    
    while True:
        try:

            input1 = input("First number ")
            input2 = input("Second number ")

            input1 = int(input1)
            input2 = int(input2)

        except ValueError:
            print("Please input numbers")
            continue
        break



    while True:
        
            operators = input("Choose operator(add, subtract, multiply, divide) ").lower()

            if operators == "add":
                result = input1 + input2
                print(result)
            elif operators == "subtract":
                result = input1 - input2
                print(result)
            elif operators == "multiply":
                result = input1 * input2
                print(result)
            elif operators == "divide":
                if input2 == 0:
                    print("Cant divide by 0")
                else:
                    result = input1 / input2
                    print(result)
            else:
                print("Please choose correct operators")
                continue
            break
        
        
   

calculator()