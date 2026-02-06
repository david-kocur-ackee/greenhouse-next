export default function displayNetworkError(message: string) {
    displayNetworkError(
        co2Error?.message ??
            humidityError?.message ??
            temperatureError?.message ??
            toggleError?.message ??
            presetError?.message ??
            'Unknown error',
    );
}