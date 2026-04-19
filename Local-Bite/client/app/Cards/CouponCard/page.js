import { Calendar, Percent, DollarSign, Plus } from "lucide-react"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function CouponCard({ coupon, onAddRestaurant }) {
    const formatDiscount = () => {
        if (coupon.discountType === "percentage") {
            return `${coupon.discount}% OFF`
        }
        return `$${coupon.discount} OFF`
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    const isExpired = new Date(coupon.expiryDate) < new Date()

    return (
        <Card className="group transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg leading-tight">{coupon.title}</CardTitle>
                    <Badge
                        variant={isExpired ? "secondary" : "default"}
                        className={
                            isExpired
                                ? "bg-muted text-muted-foreground"
                                : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                        }
                    >
                        {coupon.discountType === "percentage" ? (
                            <Percent className="size-3" />
                        ) : (
                            <DollarSign className="size-3" />
                        )}
                        {formatDiscount()}
                    </Badge>
                </div>
                <CardDescription className="line-clamp-2 mt-1">
                    {coupon.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="pb-3">
                <div
                    className={`flex items-center gap-1.5 text-sm ${isExpired ? "text-destructive" : "text-muted-foreground"
                        }`}
                >
                    <Calendar className="size-4" />
                    <span>
                        {isExpired ? "Expired" : "Expires"}: {formatDate(coupon.expiryDate)}
                    </span>
                </div>
            </CardContent>

            <CardFooter>
                <Button
                    onClick={() => onAddRestaurant?.(coupon.id)}
                    className="w-full transition-all duration-200 group-hover:bg-primary/90"
                    disabled={isExpired}
                >
                    <Plus className="size-4" />
                    Add My Restaurant
                </Button>
            </CardFooter>
        </Card>
    )
}