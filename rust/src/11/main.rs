use std::fs;

fn read_file(file_path: &str) -> String {
    fs::read_to_string(file_path).expect("Unable to read file")
}

fn turn_stone_into_new_ones(stone: i64) -> Vec<i64> {
    let mut res = Vec::new();

    if stone == 0 {
        res.push(1);
    } else if stone.to_string().len() % 2 == 0 {
        let split: Vec<char> = stone.to_string().chars().collect();
        let half = split.len() / 2;

        let left: i64 = split[..half].iter().collect::<String>().parse().unwrap();
        let right: i64 = split[half..].iter().collect::<String>().parse().unwrap();

        res.push(left);
        res.push(right);
    } else {
        res.push(stone * 2024);
    }

    res
}

fn blink(array: &[i64]) -> Vec<i64> {
    let mut res = Vec::new();

    for &stone in array {
        res.extend(turn_stone_into_new_ones(stone));
    }

    res
}

fn main() {
    let file_path = "test.txt"; // Change to "test.txt" if needed
    let line = read_file(file_path);
    let mut arr: Vec<i64> = line.split_whitespace().map(|e| e.parse().unwrap()).collect();
    let blink_number = 75;

    for _ in 0..blink_number {
        arr = blink(&arr);
    }

    println!("{}", arr.len());
}
