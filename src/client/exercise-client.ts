import { BodyPart, Muscle } from "@model/types";
import axios from "axios";

interface ExerciseDBResponse {
  name: string;
  bodyPart: BodyPart;
  equipment: string;
  target: Muscle;
  gifUrl: string;
  id: string;
}

class ExerciseDBClient {
  private baseUrl = "https://exercisedb.p.rapidapi.com";
  private urls = {
    getExercises: () => `${this.baseUrl}/exercises`,
    getExercisesByName: (name: string) =>
      `${this.baseUrl}/exercises/name/${name}`,
    getExercisesByBodyPart: (bodyPart: BodyPart) =>
      `${this.baseUrl}/exercises/bodyPart/${bodyPart}`,
    getExercisesByMuscle: (muscle: Muscle) =>
      `${this.baseUrl}/exercises/muscle/${muscle}`,
  };

  public getExercises = async () => {
    const response = await axios.get<ExerciseDBResponse[]>(
      this.urls.getExercises(),
      {
        headers: {
          "X-RapidAPI-Key":
            "d58f97b9a8mshd2e6ccde60e72e5p116929jsn523d3250a69b",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      }
    );

    return response.data;
  };

  public getExercisesByName = async (name: string) => {
    const response = await axios.get(this.urls.getExercisesByName(name), {
      headers: {
        "X-RapidAPI-Key": "d58f97b9a8mshd2e6ccde60e72e5p116929jsn523d3250a69b",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    });

    return response.data;
  };

  public getExercisesByBodyPart = async (bodyPart: BodyPart) => {
    const response = await axios.get(
      this.urls.getExercisesByBodyPart(bodyPart),
      {
        headers: {
          "X-RapidAPI-Key":
            "d58f97b9a8mshd2e6ccde60e72e5p116929jsn523d3250a69b",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      }
    );

    return response.data;
  };

  public getExercisesByMuscle = async (muscle: Muscle) => {
    const response = await axios.get(this.urls.getExercisesByMuscle(muscle), {
      headers: {
        "X-RapidAPI-Key": "d58f97b9a8mshd2e6ccde60e72e5p116929jsn523d3250a69b",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    });

    return response.data;
  };
}

export const exerciseDBClient = new ExerciseDBClient();
