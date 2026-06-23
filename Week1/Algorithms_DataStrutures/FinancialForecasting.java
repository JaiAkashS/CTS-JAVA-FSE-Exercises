public class FinancialForecasting {
    public static double Value(double currentValue, double growthRate, int years) {

        if (years == 0) {
            return currentValue;
        }
        return Value(currentValue, growthRate, years - 1) * (1 + growthRate);
    }

    public static void main(String[] args) {

        double presentValue = 10000;
        double growthRate = 0.10;
        int years = 5;

        double futureValue = Value(presentValue, growthRate, years);

        System.out.println("Future Value after " + years + " years: " + futureValue);
    }
}
