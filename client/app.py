import requests
import sys

def main():
    try:

        print("===================\n WELCOME TO THE FLIGHT ADVISOR \n===================")

        list_of_cities = requests.get("http://localhost:3000/getCities").json()

        print("[+] Current list of available cities");
        for city in list_of_cities:
            print("-" + city["name"])

        src = input("[*] Input the starting city ")
        dest = input("[*] Input the destination city ")


        params = {
            "src": src,
            "dest": dest
        }
        input("[*] Press 'Enter' to start")
        while params["src"] != params["dest"]:
            response = requests.post("http://localhost:3000/createGraph", json=params)
            if response.status_code == 404:
                print("[-] Error, one of the cities does not exist")
                sys.exit(0)
            next_step = response.json()
            print("[+] " + next_step["next"])
            input("[*] Press Enter to continue")
            params["src"] = next_step["next"].split(":")[1].strip()
        
        print("[+] Destination reached! Enjoy " + dest + " !")

    except requests.exceptions.Timeout:
        print("[-] Server timed out")


if __name__ == "__main__":
    main()

