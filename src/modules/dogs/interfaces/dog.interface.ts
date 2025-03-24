export interface DogBreeds {
  message: {
    [breed: string]: string[];
  };
  status: string;
}

export interface DogImages {
  message: string[];
  status: string;
}

export interface DogRandomImage {
  message: string;
  status: string;
} 