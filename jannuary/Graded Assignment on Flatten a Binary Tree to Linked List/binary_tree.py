class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def flatten_recursive(root):
    if not root:
        return
    
    flatten_recursive(root.left)
    flatten_recursive(root.right)
    
    temp = root.right
    root.right = root.left
    root.left = None
    
    while root.right:
        root = root.right
    root.right = temp

def flatten_morris(root):
    current = root
    while current:
        if current.left:
            predecessor = current.left
            while predecessor.right and predecessor.right != current:
                predecessor = predecessor.right
            
            if not predecessor.right:
                predecessor.right = current
                current = current.left
            else:
                predecessor.right = None
                temp = current.right
                current.right = current.left
                current.left = None
                while current.right:
                    current = current.right
                current.right = temp
        else:
            current = current.right

def print_linked_list(head):
    while head:
        print(head.val, end=" -> ")
        head = head.right
    print("None")

# Example Usage
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(5)
root.left.left = TreeNode(3)
root.left.right = TreeNode(4)
root.right.right = TreeNode(6)

# Using Recursive Pre-order Traversal
flatten_recursive(root)
print("Flattened using Recursive Pre-order Traversal:")
print_linked_list(root)

# Reset the tree for Morris Traversal
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(5)
root.left.left = TreeNode(3)
root.left.right = TreeNode(4)
root.right.right = TreeNode(6)

# Using Morris Traversal
flatten_morris(root)
print("\nFlattened using Morris Traversal:")
print_linked_list(root)
