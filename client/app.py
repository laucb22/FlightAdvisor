import requests
import sys

# Pre: ---
# Post: función de main del cliente. Obtiene el listado de ciudades del server y pide al usuario
# que introduzca las ciudades de origen y destino de la ruta que desea hacer. Por cada una de
# las veces que el usuario avanza en la ruta, pide al server que recalcule los pesos de las 
# aristas para volver a crear el grafo.
def main():
    try:
        print("===================\n WELCOME TO THE FLIGHT ADVISOR \n===================")
        # La lista de ciudades se obtiene mediante una llamada al server
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

        # Cuando se llega a la ciudad de destino, el programa finaliza
        while params["src"] != params["dest"]:
            response = requests.post("http://localhost:3000/createGraph", json=params)
            # Si no encuentra una de las ciudades, devuelve un mensaje de error
            if response.status_code == 404:
                print("[-] Error, one of the cities does not exist")
                sys.exit(0)
            next_step = response.json()
            print("[+] " + next_step["next"])
            input("[*] Press Enter to continue")
            # La ciudad a la que el usuario ha avanzado pasa a ser la nueva ciudad de origen
            params["src"] = next_step["next"].split(":")[1].strip()
        print("[+] Destination reached! Enjoy " + dest + " !")

    except requests.exceptions.Timeout:
        print("[-] Server timed out")


if __name__ == "__main__":
    main()

