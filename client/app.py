import requests


def main():
    try:

        print("===================\n WELCOME TO THE FLIGHT ADVISOR \n===================")

        list_of_cities = requests.get("http://localhost:3000/getCities").json()

        print("Current list of available cities");
        for city in list_of_cities:
            print("-" + city["name"])

        src = input("Input the starting city")
        dest = input("Input the destination")

        params = {
            "src": src,
            "dest": dest
        }
        shortest_path = requests.post("http://localhost:3000/createGraph", json=params).json()

        print(shortest_path)
    except requests.exceptions.Timeout:
        print("Server timed out")






if __name__ == "__main__":
    main()

