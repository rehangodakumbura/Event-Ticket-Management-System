import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Collect inputs
        System.out.print("Enter total number of tickets: ");
        int totalTickets = scanner.nextInt();

        System.out.print("Enter ticket release rate (ms): ");
        int releaseRate = scanner.nextInt();

        System.out.print("Enter customer retrieval rate (ms): ");
        int retrievalRate = scanner.nextInt();

        System.out.print("Enter maximum ticket capacity in pool: ");
        int maxCapacity = scanner.nextInt();

        // Save input to text file
        saveInputToFile(totalTickets, releaseRate, retrievalRate, maxCapacity);

        // Initialize TicketPool and threads
        TicketPool ticketPool = new TicketPool(totalTickets, maxCapacity);
        Thread vendor1 = new Thread(new Vendor(ticketPool, releaseRate, "Vendor-1"));
        Thread vendor2 = new Thread(new Vendor(ticketPool, releaseRate, "Vendor-2"));
        Thread customer = new Thread(new Customer(ticketPool, retrievalRate));

        // Start threads
        vendor1.start();
        vendor2.start();
        customer.start();

        // Wait for threads to finish
        try {
            vendor1.join();
            vendor2.join();
            customer.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("All tickets sold. Program terminated.");
    }

    // Method to save only input configuration to a text file
    private static void saveInputToFile(int totalTickets, int releaseRate, int retrievalRate, int maxCapacity) {
        try (FileWriter writer = new FileWriter("input_config.txt")) {
            writer.write("Total Tickets: " + totalTickets + "\n");
            writer.write("Ticket Release Rate: " + releaseRate + " ms\n");
            writer.write("Customer Retrieval Rate: " + retrievalRate + " ms\n");
            writer.write("Max Ticket Capacity: " + maxCapacity + "\n");
            System.out.println("Input configuration saved to input_config.txt");
        } catch (IOException e) {
            System.out.println("Error saving input configuration: " + e.getMessage());
        }
    }
}
