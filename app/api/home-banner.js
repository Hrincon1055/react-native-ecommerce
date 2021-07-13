import { API_URL } from "../utils/constansts";

export async function getBannerApi() {
  try {
    const url = `${API_URL}/home-banners?_sort=position:DESC`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
