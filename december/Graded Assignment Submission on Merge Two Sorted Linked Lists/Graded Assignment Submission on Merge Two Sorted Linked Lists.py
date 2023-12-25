class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_sorted_lists(list1, list2):
    # Function to merge two sorted linked lists using an extra array
    
    # Helper function to convert linked list to array
    def list_to_array(head):
        array = []
        while head:
            array.append(head.val)
            head = head.next
        return array
    
    # Helper function to convert array to linked list
    def array_to_list(array):
        dummy = ListNode()
        current = dummy
        for val in array:
            current.next = ListNode(val)
            current = current.next
        return dummy.next
    
    # Convert linked lists to arrays
    array1 = list_to_array(list1)
    array2 = list_to_array(list2)
    
    # Merge arrays and sort them
    merged_array = sorted(array1 + array2)
    
    # Convert merged array to a linked list
    merged_list = array_to_list(merged_array)
    
    return merged_list

# Example Linked Lists
list1 = ListNode(1, ListNode(3, ListNode(5)))
list2 = ListNode(2, ListNode(4, ListNode(6)))

# Merge the linked lists
merged_list = merge_sorted_lists(list1, list2)

# Print the merged list
while merged_list:
    print(merged_list.val, end=" -> ")
    merged_list = merged_list.next
