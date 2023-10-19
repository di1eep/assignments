import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

public class DirectoryAnalyzer {

    public static void main(String[] args) {
        if (args.length != 1) {
            System.err.println("Usage: java DirectoryAnalyzer <directory_path>");
            System.exit(1);
        }

        String directoryPath = args[0];
        File directory = new File(directoryPath);

        if (!directory.exists() || !directory.isDirectory()) {
            System.err.println("Invalid directory path.");
            System.exit(1);
        }

        // Create error log
        String logFilePath = "error.log";
        File logFile = new File(logFilePath);

        try {
            if (!logFile.exists()) {
                logFile.createNewFile();
            }
        } catch (IOException e) {
            e.printStackTrace();
            System.exit(1);
        }

        // Initialize error log
        PrintWriter errorLogWriter;
        try {
            errorLogWriter = new PrintWriter(new FileWriter(logFilePath));
        } catch (IOException e) {
            e.printStackTrace();
            System.exit(1);
            return;
        }

        List<File> txtFiles = new ArrayList<>();
        Map<String, Integer> wordFrequency = new HashMap<>();

        // Recursively traverse the directory and its subdirectories
        processDirectory(directory, txtFiles, wordFrequency, errorLogWriter);

        // Calculate the total size (in bytes) of all ".txt" files
        long totalSize = txtFiles.stream().mapToLong(File::length).sum();

        // Sort and display the top 10 most frequent words
        List<Map.Entry<String, Integer>> sortedWordFrequency = wordFrequency.entrySet().stream()
                .sorted((entry1, entry2) -> entry2.getValue().compareTo(entry1.getValue()))
                .limit(10)
                .collect(Collectors.toList());

        System.out.println("Total Size of .txt Files: " + totalSize + " bytes");
        System.out.println("Top 10 Most Frequent Words:");

        for (Map.Entry<String, Integer> entry : sortedWordFrequency) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        errorLogWriter.close();
    }

    private static void processDirectory(File directory, List<File> txtFiles, Map<String, Integer> wordFrequency, PrintWriter errorLog) {
        File[] files = directory.listFiles();

        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    processDirectory(file, txtFiles, wordFrequency, errorLog);
                } else if (file.getName().toLowerCase().endsWith(".txt")) {
                    txtFiles.add(file);
                    processTxtFile(file, wordFrequency, errorLog);
                }
            }
        }
    }

    private static void processTxtFile(File file, Map<String, Integer> wordFrequency, PrintWriter errorLog) {
        try (Scanner scanner = new Scanner(new FileInputStream(file))) {
            while (scanner.hasNext()) {
                String word = scanner.next().toLowerCase();
                word = word.replaceAll("[^a-zA-Z0-9]", ""); // Remove non-alphanumeric characters

                if (!word.isEmpty()) {
                    wordFrequency.put(word, wordFrequency.getOrDefault(word, 0) + 1);
                }
            }
        } catch (IOException e) {
            errorLog.println("Error processing file: " + file.getAbsolutePath());
            e.printStackTrace(errorLog);
        }
    }
}
